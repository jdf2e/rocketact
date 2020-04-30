import React from "react";
import * as API from "../api";

import ProxyRulesTabel from "../components/ProxyRulesTable";
const JSONInput = require("react-json-editor-ajrm/index").default;
import { Button, Modal, Select, Input, message } from "antd";

const ButtonGroup = Button.Group;

export interface IProxyRule {
  ruleId: string;
  match: string;
  action: "JSON" | "FORWARD";
  data: string;
  description?: string;
  latency?: number;
  enabled?: boolean;
}

interface APIProxyRouteProps {}

interface APIProxyRouteState {
  rules: Array<IProxyRule>;
  showRuleEditorModal: boolean;
  modalType: "new" | "modify";
  ruleInModal: IProxyRule;
  modalCanSave: boolean;
}

const emptyRule: IProxyRule = {
  ruleId: "",
  match: "",
  action: "FORWARD",
  data: "",
  description: ""
};

class APIProxyRoute extends React.Component<
  APIProxyRouteProps,
  APIProxyRouteState
> {
  constructor(props: APIProxyRouteProps) {
    super(props);

    this.state = {
      showRuleEditorModal: false,
      rules: [],
      modalType: "new",
      ruleInModal: emptyRule,
      modalCanSave: false
    };

    this.deleteRule = this.deleteRule.bind(this);
    this.modify = this.modify.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.move = this.move.bind(this);
    this.toggleAllEnable = this.toggleAllEnable.bind(this);
  }

  componentDidMount() {
    API.getAllProxyRule().then(result => {
      this.setState({
        rules: result
      });
    });
  }

  updateRuleInModal(partailRule: { [index: string]: any }) {
    const newRule = Object.assign({}, this.state.ruleInModal, partailRule);
    this.setState({
      ruleInModal: newRule,
      modalCanSave: newRule.match !== "" && newRule.data !== ""
    });
  }

  deleteRule(ruleId: string) {
    API.deleteProxyRule(ruleId).then(() => {
      this.setState({
        rules: this.state.rules.filter(rule => rule.ruleId !== ruleId)
      });
    });
  }

  toggleAllEnable(enabled: boolean) {
    API.toggleAllProxyRuleEnable(enabled).then(() => {
      this.setState({
        rules: this.state.rules.map(rule => {
          return Object.assign({}, rule, {
            enabled
          });
        })
      });
    });
  }

  modify(ruleId: string) {
    this.setState({
      showRuleEditorModal: !this.state.showRuleEditorModal,
      modalType: "modify",
      ruleInModal: Object.assign(
        {},
        this.state.rules.find(rule => rule.ruleId === ruleId)
      )
    });
  }

  toggleState(ruleId: string) {
    const targetRule = this.state.rules.find(rule => rule.ruleId === ruleId);
    if (targetRule) {
      API.toggleProxyRuleState(ruleId, !targetRule.enabled).then(() => {
        this.setState({
          rules: this.state.rules.map(rule => {
            if (rule.ruleId !== ruleId) {
              return rule;
            } else {
              return Object.assign({}, rule, { enabled: !targetRule.enabled });
            }
          })
        });
      });
    }
  }

  move(fromIndex: number, toIndex: number) {
    API.moveProxyRule(fromIndex, toIndex).then(() => {
      const fromRule = this.state.rules[fromIndex];
      const toRule = this.state.rules[toIndex];

      const newRules = this.state.rules.filter(
        rule => rule.ruleId !== fromRule.ruleId
      );
      const newToIndex = newRules.findIndex(
        rule => rule.ruleId === toRule.ruleId
      );
      newRules.splice(newToIndex + 1, 0, fromRule);
      this.setState({
        rules: newRules
      });
    });
  }

  render() {
    return (
      <div>
        <p style={{ textAlign: "right" }}>
          <Button
            type="primary"
            ghost
            icon="plus"
            onClick={() => {
              this.setState({
                showRuleEditorModal: !this.state.showRuleEditorModal,
                modalType: "new",
                ruleInModal: Object.assign({}, emptyRule)
              });
            }}
          >
            Create new rule
          </Button>
          &nbsp;&nbsp;
          <ButtonGroup>
            <Button icon="api" onClick={() => this.toggleAllEnable(true)}>
              Enable All Rules
            </Button>
            <Button
              icon="disconnect"
              onClick={() => this.toggleAllEnable(false)}
            >
              Disable All Rules
            </Button>
          </ButtonGroup>
        </p>
        <ProxyRulesTabel
          rules={this.state.rules}
          delete={this.deleteRule}
          modify={this.modify}
          toggleState={this.toggleState}
          move={this.move}
        />
        <Modal
          title={
            this.state.modalType === "new" ? "Create New Rule" : "Modify Rule"
          }
          visible={this.state.showRuleEditorModal}
          width={800}
          okText={this.state.modalType === "new" ? "Create" : "Update"}
          cancelText="Cancel"
          maskClosable={false}
          onOk={() => {
            if (this.state.modalType === "new") {
              const newRule = Object.assign({}, this.state.ruleInModal);
              delete newRule.ruleId;
              API.crateProxyRule(newRule).then(
                result => {
                  message.success("New rule created");
                  this.setState({
                    rules: [
                      Object.assign({}, newRule, {
                        ruleId: result.ruleId,
                        enabled: true
                      }),
                      ...this.state.rules
                    ],
                    showRuleEditorModal: false
                  });
                },
                () => {
                  message.error(
                    "Failed to create proxy rule. Please try again later."
                  );
                }
              );
            } else {
              const newRule = Object.assign({}, this.state.ruleInModal);
              API.updateProxyRule(newRule.ruleId, newRule).then(
                result => {
                  message.success("Rule updated");
                  this.setState({
                    rules: this.state.rules.map(rule => {
                      if (rule.ruleId !== newRule.ruleId) {
                        return rule;
                      } else {
                        return newRule;
                      }
                    }),
                    showRuleEditorModal: false
                  });
                },
                () => {
                  message.error(
                    "Failed to update proxy rule. Please try again later."
                  );
                }
              );
            }
          }}
          okButtonProps={{ disabled: !this.state.modalCanSave }}
          onCancel={() => {
            this.setState({ showRuleEditorModal: false });
          }}
          destroyOnClose
        >
          <div>
            <h3>
              Description:{" "}
              <Input
                style={{ width: 500 }}
                defaultValue={this.state.ruleInModal.description}
                placeholder="optional text to describe the goal of this rule"
                onChange={e =>
                  this.updateRuleInModal({ description: e.target.value })
                }
              />
            </h3>
            <h3>If request matches the following regexp</h3>
            <Input
              style={{ width: 500 }}
              addonBefore="/"
              addonAfter="/"
              defaultValue={this.state.ruleInModal.match}
              onChange={e => this.updateRuleInModal({ match: e.target.value })}
            />
            <h3 style={{ margin: "0.5rem 0" }}>then</h3>
            <Select
              style={{
                width: 180,
                marginBottom: "0.5rem",
                marginRight: "0.5rem"
              }}
              defaultValue={this.state.ruleInModal.action}
              onChange={newValue => {
                this.updateRuleInModal({ action: newValue, data: "" });
              }}
            >
              <Select.Option value="FORWARD">
                forward it to remote
              </Select.Option>
              <Select.Option value="JSON">respond with JSON</Select.Option>
            </Select>
            {this.state.ruleInModal.action === "FORWARD" ? (
              <Input
                style={{ width: 500 }}
                defaultValue={this.state.ruleInModal.data}
                placeholder="http://example.com"
                onChange={e => this.updateRuleInModal({ data: e.target.value })}
              />
            ) : (
              <JSONInput
                placeholder={
                  this.state.ruleInModal.data === ""
                    ? {}
                    : JSON.parse(this.state.ruleInModal.data)
                }
                onChange={(newValue: { error: boolean; json: string }) => {
                  this.updateRuleInModal({
                    data: newValue.error ? "" : newValue.json
                  });
                }}
                height="350px"
                width="700px"
              />
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

export default APIProxyRoute;
