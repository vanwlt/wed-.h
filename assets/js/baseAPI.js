// 注意：每次调用$.get()或$.post()或$.ajax()的时候
// 会先调用ajaxprefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options) => {
  // console.log(options)
  // 在请求之前拼接上根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url
})
