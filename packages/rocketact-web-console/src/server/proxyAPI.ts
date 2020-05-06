import fs from "fs";
import path from "path";
import express, { RequestHandler } from "express";
import httpProxy from "http-proxy";

import { appPackageJson, resolveToAppRoot } from "rocketact-dev-utils";

import { IProxyRule } from "../client/routes/apiProxy";

const CONFIG_FILE = resolveToAppRoot("proxy.config.json");

const generateRuleId = () =>
  Math.random()
    .toString(36)
    .substring(2) + new Date().getTime().toString(36);

const proxyAPI = express.Router();

let ruleCache: Array<IProxyRule> = [];
const ruleMatchRegExpCache: { [index: string]: RegExp } = {};
const proxy = httpProxy.createProxyServer({});

proxy.on("error", (err, req, res) => {
  res.writeHead(500, {
    "Content-Type": "text/plain"
  });

  res.end(`Rocketact: Failed to get response from upstream.`);
});

const loadFromDisk = () => {
  try {
    ruleCache = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8").toString());
  } catch (e) {}
};

const syncToDisk = () => {
  fs.writeFileSync(
    CONFIG_FILE,
    JSON.stringify(
      ruleCache,
      (key, value) => {
        return key === "enabled" ? undefined : value;
      },
      "  "
    ),
    "utf-8"
  );
};
loadFromDisk();
/**
 * get all rules
 */
proxyAPI.get("/rules", (req, res) => {
  res.json({
    data: ruleCache,
    success: true
  });
});

/**
 * create new rule and return metadata list
 */
proxyAPI.post("/rules", (req, res) => {
  const rule = Object.assign({}, req.body, {
    ruleId: generateRuleId(),
    enabled: true
  });
  ruleCache.unshift(rule);
  syncToDisk();
  res.json({
    success: true,
    data: {
      ruleId: rule.ruleId
    }
  });
});

/**
 * modify the enabled of all rules
 */
proxyAPI.put("/rules/enable", (req, res) => {
  ruleCache = ruleCache.map(rule => {
    return Object.assign({}, rule, { enabled: req.body.enabled });
  });

  res.json({
    success: true
  });
});

/**
 * modify detail info of specific rule
 */
proxyAPI.put("/rule/:ruleId", (req, res) => {
  ruleCache = ruleCache.map(rule => {
    if (rule.ruleId !== req.params.ruleId) {
      return rule;
    } else {
      return Object.assign({}, rule, req.body);
    }
  });
  syncToDisk();
  res.json({
    success: true
  });
});

/**
 * toggle rule enabled status
 */
proxyAPI.put("/rule/:ruleId/enabled", (req, res) => {
  ruleCache = ruleCache.map(rule => {
    if (rule.ruleId === req.params.ruleId) {
      return Object.assign({}, rule, { enabled: req.body.enabled });
    } else {
      return rule;
    }
  });

  res.json({
    success: true
  });
});

/**
 * remove specific rule
 */
proxyAPI.delete("/rule/:ruleId", (req, res) => {
  const ruleId = req.params.ruleId;

  ruleCache = ruleCache.filter((rule: IProxyRule) => rule.ruleId !== ruleId);
  syncToDisk();
  res.json({
    success: true
  });
});

/**
 * change rule order
 */
proxyAPI.post("/rules/move", (req, res) => {
  const { fromIndex, toIndex } = req.body;

  const fromRule = ruleCache[fromIndex];
  const toRule = ruleCache[toIndex];

  const newCache = ruleCache.filter(rule => rule.ruleId !== fromRule.ruleId);
  const newToIndex = newCache.findIndex(rule => rule.ruleId === toRule.ruleId);
  newCache.splice(newToIndex + 1, 0, fromRule);
  ruleCache = newCache;
  syncToDisk();
  res.json({
    success: true
  });
});

let proxyHandler: RequestHandler = (req, res, next) => {
  if (req.url.match(/ROCKETACT_WEB_CONSOLE/)) {
    next();
    return;
  }

  const matchedRule = ruleCache.find(rule => {
    if (!rule.enabled) {
      return false;
    }

    if (!ruleMatchRegExpCache[rule.match]) {
      ruleMatchRegExpCache[rule.match] = new RegExp(rule.match);
    }

    return ruleMatchRegExpCache[rule.match].test(req.url);
  });

  if (matchedRule) {
    if (matchedRule.action === "JSON") {
      res.json(JSON.parse(matchedRule.data));
    } else if (matchedRule.action === "FORWARD") {
      proxy.web(req, res, { target: matchedRule.data, changeOrigin: true });
    }
  } else {
    next();
  }
};

export default proxyAPI;
export { proxyHandler };
