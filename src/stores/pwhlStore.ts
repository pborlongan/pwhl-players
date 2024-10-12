import { defineStore } from 'pinia'
import axios from "axios";

const PLAYER_IMAGE = 'https://assets.leaguestat.com/pwhl/240x240/';

export interface Player {
    playerLink: {},
    playerData: {}
}

export const usePWHLStore = defineStore('pwhlStore', {
    state: () => ({
        data: null,
        error: null,
        clearedPlayers: [] as any,
        isLoading: false
    }),
    getters: {
    },
    actions: {
        async getAllPlayers() {
            try {
                this.isLoading = true;
                const response = await axios.get('/api/feed/index.php?feed=statviewfeed&view=players&season=1&team=all&position=skaters&rookies=0&statsType=standard&rosterstatus=undefined&site_id=2&first=0&limit=9999&sort=name&league_id=1&lang=en&division=-1&conference=-1&key=694cfeed58c932ee&client_code=pwhl');
                const data = JSON.parse(response.data.substring(2, response.data.length - 2));
                await this.getActivePlayers(data);
            } catch (error: any) {
                console.error('Error fetching data:', error);
                this.error = error.response.data;
            } finally {
                this.isLoading = false;
            }
        },
        async getPlayerData(playerLinkNum: string) {
            try {
                const response = await axios.get(`/api/feed/index.php?feed=statviewfeed&view=player&player_id=${playerLinkNum}&season_id=&site_id=2&key=694cfeed58c932ee&client_code=pwhl`);
                const data = JSON.parse(response.data.substring(1, response.data.length - 1));
                return data['info'];
            } catch (error: any) {
                console.error('Error fetching data:', error);
                this.error = error.response.data
            }
        },
        async getActivePlayers(data: any) {
            const getArrayData = data['sections'][0]['data'];
            const playerPromises = getArrayData.map(async (player: any) => {
                if (player['prop']['active']['active'] === '1') {
                    let obj = {} as Player;
                    const playerInfo = await this.getPlayerData(player['prop']['name']['playerLink']);

                    if (playerInfo) {
                        obj.playerData = playerInfo;
                        obj.playerLink = {
                            ...player['prop']['name'],
                            playerImage: PLAYER_IMAGE + `${player['prop']['name']['playerLink']}.jpg`
                        };

                        this.clearedPlayers.push(obj);
                    }
                }
            });

            await Promise.allSettled(playerPromises);
        }
    },
})
