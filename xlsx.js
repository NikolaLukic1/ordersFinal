import('@/vendor/Export2Excel').then(excel => {
    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
    const data = this.list
    excel.export_json_to_excel({
      header: tHeader, //Header Required
      data, //Specific data Required
      filename: 'excel-list', //Optional
      autoWidth: true, //Optional
      bookType: 'xlsx' //Optional
    })
  })