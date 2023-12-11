# Guide: OAuth

## GitHub

Read on
[`sergiodxa/remix-auth-github`](https://github.com/sergiodxa/remix-auth-github)
and GitHub Docs for
[Creating an OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

Create a new OAuth App on
[Developer applications](https://github.com/settings/developers).

Get the Client ID and generate the Client Secret.

```sh
GITHUB_CLIENT_ID="replace_this"
GITHUB_CLIENT_SECRET="replace_this"
```

Make sure to setup the correct URLs.

- Homepage URL: <https://example.com>
- Authorization callback URL: <https://example.com/auth/github/callback>

GitHub doesn't allow to have more than 1 URI per Client ID. So just need to
create another for different environments (local, staging, production).

## Google

Read on [`remix-auth-google`](https://www.npmjs.com/package/remix-auth-google)
and Google for Developer Docs for
[Using OAuth 2.0 for Web Server Applications](https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred)

1. Go to the
   [Credentials](https://console.developers.google.com/apis/credentials) page.
2. In the
   [APIs & Services: Credentials page](https://console.cloud.google.com/apis/credentials)
   page, **Create credentials** > **OAuth client ID**.
3. Select the **Web application** application type.
4. Fill in the form and click **Create**.
   - Name: The name of your OAuth 2.0 client
   - Authorized JavaScript origins:
     - <http://localhost:3000>
     - <https://example.com>
   - Authorized redirect URIs:
     - <http://localhost:3000/auth/google/callback>
     - <https://example/auth/google/callback>

The redirect URIs are the endpoints to which the OAuth 2.0 server can send
responses. These endpoints must adhere to Google’s validation rules. You can
also specify URIs that refer on local such as <http://localhost:3000>.

Google allows to have more than 1 URI per Client ID. Although it might be better
to adjust for different environments (local, staging, production).

Get the Client ID and generate the Client Secret.

```sh
GOOGLE_CLIENT_ID="replace_this"
GOOGLE_CLIENT_SECRET="replace_this"
```
