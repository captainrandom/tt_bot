.PHONY: setup-install
setup-install:
	npm install -g yarn ts-node
	yarn install

.PHONY: run-bot
run-bot:
	./run-bot.sh

.PHONY: setup-configs
setup-configs:
	cp systemd/* /etc/systemd/system/
	sudo systemctl daemon reload
	sudo systemctl enable tt-bot

.PHONY: download-configs
download-configs:
	aws s3 cp --recursive s3://mark-personal-acct-artifacts/tt_bot/bots ./bots
	aws s3 cp s3://mark-personal-acct-artifacts/tt_bot/giphy_api_key .

upload-configs:
	aws --profile personal s3 cp --recursive ./bots s3://mark-personal-acct-artifacts/tt_bot/bots
	aws --profile personal s3 cp ./giphy_api_key s3://mark-personal-acct-artifacts/tt_bot/giphy_api_key
