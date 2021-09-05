.PHONY: run-bot
run-bot:
	WORK_DIR="." ./run-bot.sh

.PHONY: copy-configs
copy-configs:
	sudo cp systemd/* /etc/systemd/system/
	sudo systemctl daemon-reload
	sudo systemctl enable tt-bot
	sudo systemctl enable tt-bot-restart
	crontab -u $(whoami) crontab

.PHONY: start-server
start-server: copy-configs
	sudo systemctl start tt-bot
	sudo systemctl start tt-bot-restart

.PHONY: restart-server
restart-server: copy-configs
	sudo systemctl reboot tt-bot
	sudo systemctl reboot tt-bot-restart

.PHONY: stop-server
stop-server:
	sudo systemctl stop tt-bot-restart
	sudo systemctl stop tt-bot

.PHONY: setup-install
setup-install:
	npm install -g yarn ts-node
	yarn install

.PHONY: download-configs
download-configs:
	aws s3 cp --recursive s3://mark-personal-acct-artifacts/tt_bot/bots ./bots
	aws s3 cp s3://mark-personal-acct-artifacts/tt_bot/giphy_api_key .

upload-configs:
	aws --profile personal s3 cp --recursive ./bots s3://mark-personal-acct-artifacts/tt_bot/bots
	aws --profile personal s3 cp ./giphy_api_key s3://mark-personal-acct-artifacts/tt_bot/giphy_api_key
