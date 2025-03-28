import redis from 'redis';

const client = redis.createClient({
    url : "redis://localhost:6379"
});

async function pickSubmissions() {
    try{
        while(1) {
            const response = await client.brPop("submissions", 0)
            
            await client.rPop("submissions")
            console.log(response);
        }
    } catch(err) {
        console.error("Error while picking submission:", err)
    }
}

async function main(){
    try {
        await client.connect();
        pickSubmissions();
    } catch(err) {
        console.error("Error while connecting:", err);
    }
}

main()