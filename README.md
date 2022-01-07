# StamPon-Bot

**StamPon-Bot**は、[StamPon/すたんぽん](https://github.com/kaiyu-tech/stampon) へブックマークを登録するための**Discord Bot**です。

# Setup

- initialization

```sh
git clone https://github.com/kaiyu-tech/stampon-bot
```

```sh
cd stampon-bot
```

```sh
yarn install
```

- environment variable

```sh
touch .env
```

```txt
# Example of '.env'
TZ = Asia/Tokyo
LANG = ja-JP

DISCORD_CLIENT_ID = <YOUR_DISCORD_CLIENT_ID>
DISCORD_GUILD_ID = <YOUR_DISCORD_GUILD_ID>
DISCORD_ACCESS_TOKEN = <YOUR_DISCORD_ACCESS_TOKEN>

STAMPON_STAMPS = ["kininaru","👀"]
STAMPON_API_URI = http://127.0.0.1:3000/api/marks
STAMPON_API_TOKEN = <YOUR_STAMPON_API_TOKEN>
```

| Environment variable name | Description  |
| ---  | --- |
| DISCORD_CLIENT_ID | OAuth2 Client ID  |
| DISCORD_GUILD_ID | Specifying where to use Stampon Bot  |
| DISCORD_ACCESS_TOKEN | Discord Bot Access Token  | 
| STAMPON_STAMPS | Stamps that Stampon Bot responds to |
| STAMPON_API_URI | URI of the Stampon API |
| STAMPON_API_TOKEN | Token to access the Stampon API |

# Lint & Prettier

```sh
yarn run fix
```

# Run

```sh
node --require dotenv/config index.js
```
