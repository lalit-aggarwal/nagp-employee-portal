function applyToJob(jobId, userId) {
  $.post('/project/'+jobId+'/apply', { 'userId': userId }, function (data) {
    location.reload();
  });
}