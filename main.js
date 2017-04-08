require("babel-core").transform("code");

import IO from 'socket.io';

import {
	GetUptime,
	GetRAMInfo,
	GetSwapInfo,
	GetCPUInfo,
	GetFsInfo,
	Log
} from './fn';

//import config from './config/config.json';

const io = IO(8080);

io.on('connection', (socket) => {

	socket.use((packet, next)=>{
		Log.d(packet);
		next();
	})

	socket.on('get system info', (callback) => {
		if(callback && typeof callback === 'function')
			callback({
				uptime: GetUptime(),
				raminfo: GetRAMInfo(),
				swalinfo: GetSwapInfo(),
				cpuinfo: GetCPUInfo(),
				fsspace: GetFsInfo()
			})
	})

})
