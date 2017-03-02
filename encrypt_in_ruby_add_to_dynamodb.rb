require "aws-sdk-core"
require "gibberish"

data = "AMANDA"
key = "datakey" #this goes in a config somewhere
cipher = Gibberish::AES.new(key)
encrypted_data = cipher.encrypt(data)

Aws.config.update({
  region: "us-west-2",
  #endpoint: "http://localhost:8000"
})

dynamodb = Aws::DynamoDB::Client.new

tableName = 'password'

user = "2"
password =  encrypted_data

item = {
    user: user,
    password: password

}

params = {
    table_name: "password",
    item: item
}

begin
    result = dynamodb.put_item(params)
    puts "Added item"

rescue  Aws::DynamoDB::Errors::ServiceError => error
    puts "Unable to add item:"
    puts "#{error.message}"
end