
const cache = {};

const set = (key, data) => {
    cache[key] = {
        data: data,
        cachedAt: new Date().getTime()
    };
};

const get = (key) => {
    return new Promise((resolve) => {
        resolve(cache[key] && cache[key].cachedAt + 60 * 60 * 1000 > new Date().getTime()
            ? cache[key].data
            : null
        );
    });
};

const invalidate = (key) => {
    delete cache[key];
}

export default {
    set, 
    get
};