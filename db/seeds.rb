# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
  addresses = Address.create([
  	{ 
  		street1: 'street1',
		street2: 'street2',
		city: 'city',
		state: 'state',
		country: 'country',
		zipcode: 'zipcode',
		user_id: 1,
		created_at: '',
		updated_at: '',
  	},
  ])

  User.create(id: '', first_name: 'dev', last_name: 'mozo', email: 'mozo@localhost', phone: '9876543210')
