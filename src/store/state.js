import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
	singer: {},
	playing: false,		
	fullScreen: false,				// 播放器显示
	playlist: [],					// 播放列表
	sequenceList: [],   			// 顺序列表
	mode: playMode.sequence,  		// 播放模式
	currentIndex: -1,
	disc: {},						// 歌单
	topList: {},					// 排行榜
	searchHistory: loadSearch(), 	// 搜索历史
	playHistory: loadPlay(),		// 播放历史
	favoriteList: loadFavorite()	// 收藏
}

export default state