# Junko

Junko is the API backend for Sakura, the Frontend for the upcoming Sayonika booru.

Unlike most backends which implement a whole express server, Junko uses [Micro](https://github.com/zeit/micro), which allows us to write the api in a Microservice format.

This server is compatible entirely for both Micro and [Now v2](https://now.sh).

## Running

To run this on your local machine, simply do `yarn start`. For development purposes (which allows hot-reloading, and more detailed statistics), do `yarn dev`.

If you, however, plan to deploy it in Now, simply do `now`. Keep in mind to set secrets we set in `env`.

You will need a pomf uploader, in this case, we use [owo cloud](https://whats-th.is/).