export default {
  methods: {
    resize(url, width, height) {
      return (
        url +
        `?x-oss-process=image/auto-orient,1/resize,m_fixed,w_${width},h_${height}/quality,q_90/watermark,text_S2FtZSBUZWNobm9sb2d5,color_a6a0a0,size_5,g_center,t_42,x_10,y_10`
      )
    }
  }
}
