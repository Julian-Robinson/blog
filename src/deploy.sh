rm -f -r .deploy_git 

echo "generating site"
hexo generate --config _config.deploy.yml

echo "deploying... "
hexo deploy --config _config.deploy.yml

echo "Site deployed"

