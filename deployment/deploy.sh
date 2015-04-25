echo "Updating apt-get"
sudo apt-get update

echo "Installing Git"
sudo apt-get install git

echo "Installing Ruby (used by SASS)"
sudo apt-get install ruby

echo -n "Installing SASS(Creates css from scripts)"
sudo su -c "gem install sass"

echo "Installing Node(The main server)"
sudo apt-get install nodejs

echo "Installing legacy node too"
sudo apt-get install nodejs-legacy

echo "Installing NPM(Node Packet Manager)"
sudo apt-get install npm

echo "Installing Redis"
sudo apt-get install redis-server


FOLDER_NAME="lecture-viewer-deploy"

echo "Cloning LectureViewer repo to " + $FOLDER_NAME
git clone https://github.com/umass-cs-497/lecture-viewer.git $FOLDER_NAME

cd $FOLDER_NAME

echo "Installing all NPM dependencies"
npm install

echo "Installing Gulp (Used for compiling front-end)"
sudo npm install gulp -g

echo "Running Gulp to generate client side code from source"
gulp

echo "Installing Haraka SMTP mail server"
npm install -g Haraka

echo "Creating the Haraka SMTP service"
haraka -i $FOLDER_NAME

echo "Starting the Haraka SMTP service"
sudo haraka -c $FOLDER_NAME
