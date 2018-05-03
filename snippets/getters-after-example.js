/* eslint-disable */

setVideoData(lookedupVideoId) {
  let { network, videoId, } = this.changeset;
  videoId = lookedupVideoId || populateVideoId(network, videoId);

  changeset.setProperties({
    videoId,
    networkVideoId: videoId,
    videoGroup: fakeVideoGroupName,
    platformNetworkGroupingId: this.selectedPlatformNetworkGroupingId
  });
},
