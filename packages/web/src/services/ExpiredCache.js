import ItemCache from "./ItemCache"

export default class ExpiredCache {
    // 定义静态数据map来作为缓存池
    static cacheMap = new Map()

    // 数据是否超时
    static isOverTime(name) {
       
        const data = ExpiredCache.cacheMap.get(name)
        console.log('>>> is:', data);
        // 没有数据 一定超时
        if (!data) return true

        // 获取系统当前时间戳
        const currentTime = (new Date()).getTime()

        // 获取当前时间与存储时间的过去的秒数
        const overTime = (currentTime - data.cacheTime) / 1000

        // 如果过去的秒数大于当前的超时时间，也返回null让其去服务端取数据
        if (Math.abs(overTime) > data.timeout) {
            // 此代码可以没有，不会出现问题，但是如果有此代码，再次进入该方法就可以减少判断。
            ExpiredCache.cacheMap.delete(name)
            return true
        }

        // 不超时
        return false
    }

    // 当前data在 cache 中是否超时
    static has(name) {
        return !ExpiredCache.isOverTime(name)
    }

    // 删除 cache 中的 data
    static delete(name) {
        return ExpiredCache.cacheMap.delete(name)
    }

    // 获取
    static get(name) {
        const isDataOverTime = ExpiredCache.isOverTime(name)
        //如果 数据超时，返回null，但是没有超时，返回数据，而不是 ItemCache 对象
        return isDataOverTime ? null : ExpiredCache.cacheMap.get(name).data
    }

    // 默认存储20分钟
    static set(name, data, timeout = 1200) {
        // 设置 itemCache
        const itemCache = new ItemCache(data, timeout)
        console.log('>>> set', data, itemCache);
        //缓存
        ExpiredCache.cacheMap.set(name, itemCache)
    }
}