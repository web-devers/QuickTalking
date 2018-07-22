function fetch(url) {
  console.log(`down ${url} started`);
  const deferred = Q.defer();
  const file = getfile(url);
  fs.ensureDirSync(path.dirname(file));
  const stream = request
    .get(url)
    .on('error', (err) => {
      deferred.reject(`down ${url}:${err}`);
    })
    .on('response', (res) => {
      if (res.statusCode !== 200) {
        deferred.reject(`down ${url}:${res.statusCode}`);
      } else {
        console.log(`down ${url}:${res.statusCode}`);
      }
    })
    .pipe(fs.createWriteStream(`${file}`));

  stream.on('finish', () => {
    deferred.resolve();
  });
  return deferred.promise;
}
// var res=fetch("https://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word="+"美女");
// console.log(res);

module.exports={
  fetch:fetch
}