.PHONY: run-bot
run-bot:
	BOTNAME=test-bot ts-node new-bot-runner.ts

.PHONY: download-configs
download-configs:
	aws s3 cp --recursive s3://mark-personal-acct-artifacts/tt_bot/bots ./bots
	aws s3 cp s3://mark-personal-acct-artifacts/tt_bot/giphy_api_key .

upload-configs:
	aws --profile personal s3 cp --recursive ./bots s3://mark-personal-acct-artifacts/tt_bot/bots
	aws --profile personal s3 cp ./giphy_api_key s3://mark-personal-acct-artifacts/tt_bot/giphy_api_key
