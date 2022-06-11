const form = layui.form

form.verify({
  pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  samePwd: (val) => {
    if (val === $('[name=oldPwd]').val()) return '新旧密码不能相同！'
  },
  rePwd: (val) => {
    if (val !== $('[name=newPwd]').val()) return '两次密码不一致！'
  },
})

// 更新密码
const layer = layui.layer

// 发送请求，重置密码
$('.layui-form').submit(function (e) {
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: '/my/updatepwd',
    data: $(this).serialize(),
    success: (res) => {
      if (res.status !== 0) return layer.msg('更新密码失败！')
      layer.msg('更新密码成功！')
      // 强制清空 token
      localStorage.removeItem('token')
      // 2. 跳转到登录页面
      window.parent.location.href = '/login.html'
    },
  })
})
