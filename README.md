<h3>Rails4 + AngularJS </h3>

Check demo app <a href="https://rails4-crud-with-angularjs.herokuapp.com">here</a>.

1. CRUD example using Rails4 + AngularJS

   <p>In this app I given example of how to create CRUD operation using Rails4 with AngularJS.</p>

2. Create nested form using AngularJS

 </p>When we need to create nested form in rails, then we used nested_form gem. But if you using AngularJS as frontend then you can't use that.</p>
<p>When you want nested form to using AngularJS, you need to write your own code. In this app I given sample code for nested form.</p>

<h3>License</h3>
<p>This is released under the MIT license.</p>


```bash
brew install postgresql mariadb
# check out here (https://mariadb.com/kb/en/getting-installing-and-upgrading-mariadb/) to install MariaDB

mysql.server start

git clone codeforseoul/showcase # if using hub

bundle install
# if you have an error while install 'pg', then check out this answers on stackoverflow: http://stackoverflow.com/questions/25629953/bundle-failing-cant-find-the-postgresql-client-library-libpq

# copy or move database_example.yml to database.yml & add your mysql password before rake db:setup

bundle exec rake db:setup

rails s

open http:localhost:3000
```
