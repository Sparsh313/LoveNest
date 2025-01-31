> 1>Login to AWS
> 2>Launch Instance
> 3>Install secret pair key
> 4>Open terminal and cd to where your key is installed
> chmod 400 <secret>.pen
> 5>run ssh comand to run the machine
> 6>Install Node in machine (install the same version as you were using in the local machine)
> 7>now clone your github to machine using
> git clone [github_code_link] and check using [ls]

[Frontend]

> 1>npm run build in both => [dist] folder formed
> 2>npm i in machine
> 3>sudo apt update in machine
> 4>sudo apt install nginx in machine
> 5>sudo systemctl start nginx
> 6>sudo systemctl enable nginx
> 7>copy code from dist to /var/www/html
> "sudo scp -r dist/\* /var/www/html"
> 8> enable port 80 on your instance

[BACKEND]

> 1>npm i
> 2>put AWS IP on Atlas instead of 0.0.0.0 so only your local IP and your machine IP(public IP) will only have access to your DB
> 3>enable port 7777 on your instance (custom TCP)
> 4>we have to use process manager (PM2) to run the server in backgrund otherwise when u close the terminal your app will crash
> 5>npm i pm2 -g
> 6>pm2 start npm -- start
> OR giving a name => pm2 start npm --name "LoveNest-backend" -- start
> 7>pm2 logs , pm2 list , pm2 flush <name> , pm2 stop <name> , pm2 delete <name>
> 8>config nginx - /etc/ngnix/sites-available/default
> 9>restart ngnix - sudo systemctl restart nginx
> 10>modify the BASE_URL in frontend from https:localhost:7777 to /api and push it to github
> 11>now go to frontend and git pull > npm run build > sudo scp -r dist/\* /var/www/html

ngnix config:
a>server name:
b> location /api/{
take this code from ChatGpt
}

[Creating_a_DomainName]

> 1>Purchase domain name from godaddy
> 2> signup on cloudflare add new domain name
> 3>change the nameserver on godaddy and point it to cloudflare
> 4> DNS record :

type :A
name :devtinder.in
content :your IP

> 5>Enable SSL
