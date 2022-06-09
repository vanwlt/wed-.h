$(function () {
  // 点击去注册账号让 登录框隐藏，注册框显示
  $('#link_reg').click(() => {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击去登录让 注册框隐藏，登录框显示
  $('#link_login').click(() => {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  const form = layui.form

  // 通过 form.verify() 方法自定义校验规则
  form.verify({
    // 自定义一个叫 pwd 的校验规则
    repwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: (value) => {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      const pwd = $('.reg-box [name=password').val()
      // 判断两次密码是否一致
      if (pwd !== value) return '两次密码不一致'
    },
  })
  // 基本路径
  const baseUrl = 'http://liulongbin.top:3007'
  // 监听表单那提交事件，发送注册请求
  $('#form_reg').submit((e) => {
    e.preventDefault()
    // 发起注册的请求
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功！')
        // 模拟点击事件， 跳转到登录
        $('#link_login').click()
      },
    })
  })
  // 监听登录表单提交事件，发送登录请求
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('登陆失败')
        layer.msg('登陆成功')
        // 1.要把token存在本地
        localStorage.setItem('token', res.token)
        //2.跳转到首页
        location.href = '/index.html'
      },
    })
  })
})
