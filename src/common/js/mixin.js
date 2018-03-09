import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playlistMixin = {
	computed: {
		...mapGetters([
			'playlist'
		])
	},
	mounted() {
		this.handlePlaylist(this.playlist)
	},
	activated() {
		this.handlePlaylist(this.playlist)
	},
	watch: {
		playlist(newVal) {	
			this.handlePlaylist(newVal)
		}
	},
	methods: {
		handlePlaylist() {
			// 组件未定义此函数就执行
			throw new Error('component must implement handlePlaylist method')
		}
	}
}

export const playerMixin = {
	computed: {
		iconMode() {
			return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
		},
		...mapGetters([
	        'sequenceList',
	        'currentSong',
	        'playlist',
	        'mode',
	        'favoriteList'
	    ])
	},
	methods: {
		changeMode() {
	        // 改变播放模式
	        const mode = (this.mode + 1) % 3   // 循环直接取余数不用写if判断然后重置那些冗余代码,牛逼
	        this.setPlayMode(mode)
	        let list = null
	        if (mode === playMode.random) {
	          list = shuffle(this.sequenceList)
	        } else {
	          list = this.sequenceList
	        }
	        this.resetCurrentIndex(list)
	        this.setPlayList(list)
        },
         resetCurrentIndex(list) {
	        // 保持歌曲一致
	        let index = list.findIndex((item) => {
	          return item.id === this.currentSong.id
	        })
	        this.setCurrentIndex(index)
	    },
	    getFavoriteIcon(song) {
	    	if (this.isFavorite(song)) {
	    		return 'icon-favorite'
	    	}
	    	return 'icon-not-favorite'
	    },
	    toggleFavorite(song) {
	    	if (this.isFavorite(song)) {
	    		this.deleteFavoriteList(song)
	    		this.$refs.centerTip.show()
	    		this.favoriteTip = '取消收藏'
	    	} else {
	    		this.saveFavoriteList(song)
	    		this.$refs.centerTip.show()
	    		this.favoriteTip = '收藏成功'
	    	}
	    },
	    isFavorite(song) {
	    	const index = this.favoriteList.findIndex((item) => {
	    		return item.id === song.id
	    	})
	    	return index > -1
	    },
        ...mapMutations({
        	setPlayingState: 'SET_PLAYING_STATE',
	        setCurrentIndex: 'SET_CURRENT_INDEX',
	        setPlayMode: 'SET_PLAY_MODE',
	        setPlayList: 'SET_PLAYLIST'
        }),
        ...mapActions([
        	'saveFavoriteList',
        	'deleteFavoriteList'
        ])
	}
}

export const searchMixin = {
	data() {
		return {
			query: '',
			refreshDelay: 100
		}
	},
	computed: {
		...mapGetters([
	        'searchHistory'
	    ])
	},
	methods: {
		blurInput() {
	        this.$refs.searchBox.blur()
	    },
      	saveSearch() {
        	this.saveSearchHistory(this.query)
      	},
      	addQuery(query) {
	        // 调用子组件方法
	        this.$refs.searchBox.setQuery(query)
	    },
      	onQueryChange(query) {
	        this.query = query
	    },
	    ...mapActions([
	        'saveSearchHistory',
	        'deleteSearchHistory'
	    ])
	}
}