import * as SecureStore from 'expo-secure-store';

export default class Save {

    static async getConfig() {
        let ip = await SecureStore.getItemAsync("ip") ?? "192.168.8.112";
        let port = await SecureStore.getItemAsync("port") ?? "5000";
        return { ip: ip, port: port }
    }

    static async swapNewConfig(config){
        await SecureStore.deleteItemAsync("ip");
        await SecureStore.deleteItemAsync("port");
        await SecureStore.setItemAsync("ip", config.ip);
        await SecureStore.setItemAsync("port", config.port);
    }
}