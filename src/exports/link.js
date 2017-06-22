/**
 * Created by lenovo on 2017/6/19.
 */
function NativeModule(id) {
    this.filename = id + '.js';
    this.id = id;
    this.exports = {};
    this.loaded = false;
}

NativeModule._source = process_bingding('natives');
NativeModule._cache = {};