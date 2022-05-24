# yadwh-action

Action to send a [yadwh](https://github.com/darmiel/yadwh) webhook.

## Inputs

## `url`

**Required** URL of the YADWH instance **without the name of the yadwh group**.

## `name`

**Required** Name of the yadwh service group. (e.g. `BACKEND_PROD`)

## `secret`

**Required** Secret of the yadwh group.

## Example usage

```yaml
uses: darmiel/yadwh-action@v1
with:
  url: 'https://yadwh.example.com'
  name: 'BACKEND_STAGING'
  secret: ${{ secrets.STAGED_DEPLOY_SECRET }}
```