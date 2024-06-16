FROM oven/bun:debian

# Install dependencies

# Copy the current directory contents into the container at /app
COPY . /app

WORKDIR /app 

SHELL [ "bash" , "-c"]

RUN ["bun", "install"]


EXPOSE 3000

CMD ["bun" ,"run","build"]

