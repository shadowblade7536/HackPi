import colors from 'colors';
import fs from 'fs';
import si from 'systeminformation';
import os from 'os';
import ifconfig from 'wireless-tools/ifconfig'
import SYSINFO from '../main';
import { exec } from 'child_process';
import nmap from 'node-nmap';

setInterval(()=>{
	//i should probably change this, eeh, later
	//Shouldnt we call them in order? Why nested?
	UpdateCPUInfo(()=>{
		UpdateFSInfo(()=>{
			UpdateRAMInfo(()=>{
				UpdateInterfaceInfo(()=>{
					UpdateSwapInfo(()=>{
						UpdateUptime()
					})
				})
			})
		})
	})
}, 1000)

export const secondsToString = (seconds) => {
	var numdays = Math.floor(seconds / 86400);
	var numhours = Math.floor((seconds % 86400) / 3600);
	var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
	var numseconds = ((seconds % 86400) % 3600) % 60;
	return numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
}

export const UpdateCPUInfo = (cb) => {
	si.cpuCurrentspeed(function(speed) {
		si.cpuTemperature(function(temp) {
			si.currentLoad(function(load) {
				SYSINFO.cpu = { speed, temp, load }
				cb()
			})
		})
	})
}

export const UpdateFSInfo = (cb) => {
	var fssize = si.fsSize(function(fssize) {
		var ioinfo = si.disksIO(function(ioinfo){
			var rwinfo = si.fsStats(function(rwinfo){
				SYSINFO.fs = { fssize, ioinfo, rwinfo }
				cb() //Im considering removing the ioinfo and rwinfo vars
			})
		})
	})
}

export const UpdateInterfaceInfo = (cb) => {
	ifconfig.status((error, interfaces)=>{
			SYSINFO.interfaces = interfaces
			cb()
	})
}

export const UpdateRAMInfo = (cb) => {
	var usedmem = os.totalmem() - os.freemem()
	SYSINFO.mem = {
		free: os.freemem(),
		total: os.totalmem(),
		used: usedmem
	}
	cb()
}

export const UpdateSwapInfo = (cb) => {
	var swapinfo = si.mem(function(data) {
		SYSINFO.swap = data;
		cb()
	})
}

export const UpdateUptime = () => {
	 SYSINFO.osuptime = secondsToString(os.uptime())
	 SYSINFO.uptime = secondsToString(process.uptime())
}

export const Reboot = () => {
	exec('shutdown -r now')
}

export const Shutdown = () => {
	exec('shutdown -P now')
}

export const ScanLocal = (iface, cb) => {
	
	var nmapscan = new nmap.nodenmap.NmapScan('52.32.224.1/28', '-sn', '-T5', '-n', '--max-retries 0');
	console.log("Created new scan")
	nmapscan.on('complete', (data) => {
		cb(data, nmapscan.scanTime)
	})
	nmapscan.startScan()
	
}

export const Log = {
	e: function(data) {
		var date = new Date();
		console.log('ERROR'.red, data);
	},
	i: function(data) {
		var date = new Date();
		console.log('INFO'.green, data);
	},
	w: function(data) {
		var date = new Date();
		console.log('WARN'.yellow, data);
	},
	d: function(data) {
		console.log('DEBUG'.blue, data);
	}
}