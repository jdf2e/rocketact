# `rocketact-plugin-deployftp`

> It can help you deploy bundles to static server

## Usage

Please touch a  **deployrc.yml** in your project!

```bash
.
├── build
...
├── package.json
└── deployrc.yml # !!! deploy config
```

### FTP server config template

```yaml
ftp:
  host: "server ip" # FTP server host e.g. xxx.xxx.xxx.xxx
  user: "user" # FTP server login user
  password: "password" # FTP server login password
  port: 21 # FTP server port, default 21
  include: ["*", "**/*"] # this would upload everything except dot files
  exclude: [] # e.g. exclude sourcemaps - ** exclude: [] if nothing to exclude ** default []
  deleteRemote: false # delete ALL existing files at destination before uploading if true
  forcePasv: true # Passive mode is forced (EPSV command is not sent)
  remoteDir: "/export/www/html" # FTP remote dir
```

### Other server
