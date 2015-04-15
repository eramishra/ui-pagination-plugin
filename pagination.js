var execute = function () {
  console.log('pagination');
}
var initObj = { elementId: 'pagination_invoice_summary', currentPageIndex: 4, totalPageCount: 50, execute: execute }
AmsPagination = function(initObj){
  this.elementId = initObj.elementId;
  this.currentPageIndex = initObj.currentPageIndex;
  this.targetPageIndex = initObj.currentPageIndex;
  this.totalPageCount = initObj.totalPageCount;  
  this._runDefaultFunction = initObj.execute; 
  var self = this;
  this.disablePagination = function() { 
    $('#' + self.elementId + ' #target_page_index').attr('disabled','disabled');
    $('#' + self.elementId + ' .paginator').each(function() {
      $(this).attr('disabled','disabled');
    });
  },
  this.enablePagination = function(resetPagination) {
    $('#' + self.elementId + ' #target_page_index').removeAttr('disabled');
    $('#' + self.elementId + ' .paginator').each(function() {
      $(this).removeAttr('disabled');
    });
    $('#' + this.elementId + ' #target_page_index').val(self.targetPageIndex);  
    self.currentPageIndex = parseInt(self.targetPageIndex);
    if(self.currentPageIndex == 1) { 
      $('#prev_page').attr('disabled','disabled');
    }
    if(parseInt(self.currentPageIndex) == parseInt(self.totalPageCount)) {
      $('#next_page').attr('disabled','disabled');
    }
  }
  this.getTargetPageIndex = function (){
      return this.targetPageIndex;
  }
  this.setTotalPageCount = function (count){
      $('#toatl_page_count').text(count);
      self.totalPageCount = parseInt(count);
  }
  this.setTargetPageIndex = function(pageIndex) {
      $("#target_page_index").val(pageIndex);
      self.targetPageIndex = parseInt(pageIndex);
  }
  $('body').on('submit', '#' + this.elementId + ' #pagination', function(e) {
    e.preventDefault();
    self.targetPageIndex = $(e.currentTarget).find('#target_page_index').val();
    if(parseInt(self.targetPageIndex, 10) > parseInt(self.totalPageCount, 10) || parseInt(self.targetPageIndex, 10) < 1) {
      $('#target_page_index').addClass('input-danger');
      return false;
    }
    else {
      $('#target_page_index').removeClass('input-danger');
      self.disablePagination();
      self._runDefaultFunction(e);
    }
  });
  $('body').on('click', '#' + this.elementId + ' .paginator', function(e) {
      self.targetPageIndex = parseInt(self.currentPageIndex) + parseInt($(e.currentTarget).attr('data-index'));
      self.disablePagination();
      self._runDefaultFunction(e);
  });
  $('#target_page_index').val(initObj.currentPageIndex);
  $('#toatl_page_count').text(initObj.totalPageCount);
  if(self.currentPageIndex == 1) {
    $('#prev_page').attr('disabled','disabled');
  }
  if(self.currentPageIndex == self.totalPageCount) {
    $('#next_page').attr('disabled','disabled');
  }
}
