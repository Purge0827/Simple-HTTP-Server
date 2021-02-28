const http = require("http");
const fs = require("fs");
var visit = 0;
var visits = 0;
var visitz = 0;
const user = require("username");
const fetch = require("node-fetch");
const getIP = require('external-ip')();
const webhook = require("webhook-discord");
getIP((err, ip) => {
    if (err) {
        throw err;
    }
});

const tanggal = new Date().getDate();
const bulan = new Date().getMonth();
const tahun = new Date().getFullYear();
const title = require("node-bash-title");
title("GrowMagic HTTP Server");
const { exit } = require("process");
const { fstat } = require("fs");
const ask = require("prompt-sync")();

console.clear(); 
var anjg = ""; 
function ReadSVD() {
    return fs.readFileSync('server_data.php', 'utf-8');
}
module.exports.ReadSVD = ReadSVD;
const client = http.createServer(function(req, res) {
    let ipuser = req.connection.remoteAddress;
    ipuser = ipuser.split(/::ffff:/g).filter(i => i).join(''); 
    const path = `./ip/${ipuser}.txt`;
    if (fs.existsSync(path)) { 
        res.write(`Hello ${ipuser}, This IP is blocked on our HTTP Server.`)
        res.end();
        console.log(`[${tanggal}/${bulan}/${tahun} ${displayTime()}] | [Entered Blocked IP's route] => ${ipuser} [${visits}]`);
        return;
    } 
    if (req.url == "/growtopia/server_data.php") {
        if (req.method == "POST") { 
            if (req.headers['accept'] == "*/*" && req.headers['connection'] == "close") {
                res.write(ReadSVD());
                res.end();
                visit++;
                console.log(`[${tanggal}/${bulan}/${tahun} ${displayTime()}] | [GROWTOPIA] ${ipuser} entered ${req.url} | Total Logs: ${visit} (Android/IOS)`);
            }
            else if (req.headers['accept'] == "*/*" && req.httpVersion == "1.0") {
                res.write(ReadSVD());
                res.end();
                visit++;
                console.log(`[${tanggal}/${bulan}/${tahun} ${displayTime()}] | [GROWTOPIA] ${ipuser} entered ${req.url} | Total Logs: ${visit} (Mac/Windows)`);
            }
            else {
                visits++;
                console.log(`[${tanggal}/${bulan}/${tahun} ${displayTime()}] | [ANTI SERVER DATA VIEWER] => ${ipuser} [${visits}]`);
                res.write(`Hello ${ipuser}, Your IP is now blocked to our server, Nice try!`)
                res.end();
                fs.writeFile("ip/"+ipuser+".txt", "Server-Data reading.", function(err) {
                    if(err) {
                        return console.log(err);
                    }
                }); 
            } 
        } else {
            console.log(`[${tanggal}/${bulan}/${tahun} ${displayTime()}] | [bruh connection ${req.method} (IP Blocked)] => ${ipuser} [${visits}]`);
            fs.writeFile("ip/"+ipuser+".txt", "Entered uncorrect route!", function(err) {
                if(err) {
                    return console.log(err);
                }
            });
            res.end();
            res.destroy();
        }
    } else {
        res.writeHead(598);
        res.write(`[${tanggal}/${bulan}/${tahun} ${displayTime()}] >> Hello ${ipuser}, Thankyou for visiting GrowMagic!`)
        res.end();
    }
}) 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

console.clear(); 
async function console1() {
    console.log(`[INFO] Reading your (server_data.php)...`); 
    await (2000)
    console.log(`[INFO] All loaded, initializing. Please wait!`);
    await (3000)
    client.listen(80) 
    console.log(`[INFO] The client is now litening at port 80!`); 
    console.log(ReadSVD());
} 

console1(); 
function displayTime() {
    var str = ""; 
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
    if (hours < 10) {
        hours = "0" + hours
    }  if (minutes < 10) {
        minutes = "0" + minutes
    }  if (seconds < 10) {
        seconds = "0" + seconds
    }  str += "(" + hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        str += "PM)"
    } else {
        str += "AM)"
    }
    return str;
}  