This is an example of [postgraphile](https://www.graphile.org/postgraphile/) that runs serverless on [vercel](https://vercel.com/) (formerly zeit now.) It is based on [postgraphile-lambda-example](https://github.com/graphile/postgraphile-lambda-example).

## usage

### setup

Install your local dev-tools like this:

```sh
npm i
```

You're going to need a postgres database, hosted somewhere. I used [RDS](https://aws.amazon.com/rds/) for testing.

Setup your database with some schema that will work with postgraphile. 
You will need local postgres CLI tools to use this (on Arch Linux: `sudo pacman -S postgresql-libs`.)

```sh
# this sets up defaults for commands below
export PGHOST=YOUR_DB_HOSTNAME
export PGPORT=5432
export PGUSER=YOUR_DB_USER
export PGPASSWORD=YOUR_DB_PASSWORD
export PGDATABASE=YOUR_DB_NAME

export DATABASE_URL="postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}"

# create a .env file with above settings for local dev-tools
echo -e "DATABASE_URL=\"${DATABASE_URL}\"\nDATABASE_SCHEMAS=\"public\"" > .env

createdb $PGDATABASE
psql < example.sql
```

You can test it with this:

```sh
npx postgraphile -c $DATABASE_URL
```

You should be able to run a query like this [here](http://localhost:5000/graphiql):

```graphql
{
  allThings{
    nodes {
      id
      stritem
      intitem
    }
  }
}
```

## now

First, you need to expose you environment variable to now:

```sh
now env add DATABASE_URL
```

It will ask some questions, and save the env-var for any other devs that work on this project. This will also allow you to use different variable-values for each deployment-target.

You can also use `now secret add database-url` and `npm run deploy -- -e DATABASE_URL=@database-url`, but this new way is a bit simpler to work with.

### dev

Now that it's all setup, you can run `npm start` to run a local dev copy of the example app that's here. I used [Graphql Playground](https://github.com/prisma-labs/graphql-playground) because I like it better than [GraphiQL](https://github.com/graphql/graphiql). Verify it's working locally, and you're ready to deploy.


### deploy

Deploy with `npm run deploy` to send the app up to now.