import colors from 'colors';
import fs from 'fs';
import si from 'systeminformation';
import { exec } from 'child_process';
import hostapd from 'wireless-tools/hostapd';
import ifconfig from 'wireless-tools/ifconfig';
import iwlist from 'wireless-tools/iwlist';
import iw from 'wireless-tools/iw';
import udhcpc from 'wireless-tools/udhcpc';

const secondsToString = (seconds) => {
	var numdays = Math.floor(seconds / 86400);
	var numhours = Math.floor((seconds % 86400) / 3600);
	var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
	var numseconds = ((seconds % 86400) % 3600) % 60;
	return numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
}

export const GetCPUInfo = () => {
	var cpuspeed = si.cpuCurrentspeed(function(data) {
		return data
	})

	var cputemp = si.cpuTemperature(function(data) {
		return data
	})

	var cpuload = si.currentLoad(function(data) {
		return data
	})

	var result = {
		cpusspeed: cpuspeed,
		cputemp: cputemp,
		cpuload: cpuload
	}
	return result
}


export const GetFsInfo = () => {
	var fssize = si.fsSize(function(data) {
		return data
	})
	var ioinfo = si.disksIO(function(data){
		return data
	})
	var rwinfo = si.fsStats(function(data){
		return data
	})

	var fsinfo = {
		fssize: fssize,
		ioinfo: ioinfo,
		rwinfo: rwinfo
	}
	return fsinfo;
}

export const GetInterfaceInfo = () => {
	var interfaces = os.networkInterfaces()
	for (var key in p) {
		if (p.hasOwnProperty(key)) {
			p[key].forEach(function(item, index) {
				return item
			})
		}
	}

}

export const GetRAMInfo = () => {
	var usedmem = os.totalmem() - os.freemem()
	var result = {
		freemem: os.freemem(),
		totalmem: os.totalmem(),
		usedmem: usedmem
	}
	return result
}

export const GetSwapInfo = () => {
	var swapinfo = si.mem(function(data) {
		return data
	})
}

export const GetUptime = () => {
	return secondsToString(os.uptime())
}

/*export const ListHostapdClients = () => {

}*/

export const RebootSystem = () => {
	exec('shutdown -r now')
}

export const ShutdownSystem = () => {
	exec('shutdown -P now')
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
