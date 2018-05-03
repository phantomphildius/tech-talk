/* eslint-disable */
setVideoData(lookedupVideoId) {
  let changeset = get(this, 'changeset');
  let platformNetworkGroupingId = get(this, 'selectedPlatformNetworkGroupingId');
  let {
    network,
    videoId,
  } = getProperties(changeset, 'network', 'videoId');
  videoId = lookedupVideoId || populateVideoId(network, videoId);

  changeset.setProperties({
    videoId,
    networkVideoId: videoId,
    videoGroup: fakeVideoGroupName,
    platformNetworkGroupingId
  });
},
