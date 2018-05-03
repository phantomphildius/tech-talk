/* eslint-disable */

test('video items', function(assert) {
  // snip boiler plate setup

  visit(`site/${boardId}/intel/video`);
  click('.report-item:last i.icon');

  andThen(function() {
    assert.equal(find('.report-wrapper .video-title').text().trim(), "Individual Video Name", "title");
    assert.ok(find(testSelector('status-indicators')).length, "paid");
    assert.equal(find(`.report-wrapper:first ${testSelector('date')}`).text().trim(), "07/21/16", "date");
    assert.equal(find(`.report-wrapper:first ${testSelector('selector', 'views')}`).text().trim(), "25", "views");
    assert.equal(find(`.report-wrapper:first ${testSelector('selector', 'quartile25_percentage')}`).text().trim(), "12%", "quartile25_percentage");
    assert.equal(find(`.report-wrapper:first ${testSelector('selector', 'quartile50_percentage')}`).text().trim(), "20%", "quartile50_percentage");
    assert.equal(find(`.report-wrapper:first ${testSelector('selector', 'quartile75_percentage')}`).text().trim(), "27%", "quartile75_percentage");
    assert.equal(find(`.report-wrapper:first ${testSelector('selector', 'quartile100_percentage')}`).text().trim(), "6%", "quartile100_percentage");
    assert.equal(find(testSelector('metadata-status')).attr('title'), "You are spending on this article.", "paid-title");
  });

  percySnapshot(snapshotName(assert));
});

test('load more videos in a group', function(assert) {
  let videoGroup = server.create('videoGroup', {
    title: 'My awesome video group'
  });

  server.create('videoReport', {
    board_id: boardId,
    views: 20,
    quartile25: 12,
    quartile50: 20,
    quartile75: 27,
    quartile100: 6,
    quartile25_percentage: 12,
    quartile50_percentage: 20,
    quartile75_percentage: 27,
    quartile100_percentage: 6,
    paid_views: 50,
    paid_impressions: 20,
    links: {
      video_group: `/v3/video_groups/${videoGroup.id}`,
      video_item_reports: `/v3/video_reports?group_by=video_id&video_group_id=${videoGroup.id}`,
      video_summary_item_reports: `/v3/video_reports?group_by=video_id&video.network_type%5Bin%5D%5B%5D=beacon&video.network_type%5Bin%5D%5B%5D=adwords&video.network_type%5Bin%5D%5B%5D=facebook_posts&video.network_type%5Bin%5D%5B%5D=facebook_ads&video_group_id=${videoGroup.id}`
    },
    video_group: videoGroup.attrs
  });

  let videoItems = server.createList('video', 35, {
    title: `Individual Video Name`,
    video_group_id: videoGroup.id,
    network_type: 'facebook_ads',
    source_url: 'http://andrew.com?TomBrady=great',
    published_at: 'Thu Jul 21 2016 16:55:54 GMT-0400 (EDT)',
    length: 360,
    authors: ['thoreau, hemingway']
  });

  videoItems.forEach(videoItem => {
    server.create('videoReport', {
      board_id: boardId,
      video_group_id: videoGroup.id,
      video_item_id: videoItem.id,
      views: 25,
      quartile25: 12,
      quartile50: 20,
      quartile75: 27,
      quartile100: 6,
      quartile25_percentage: 12,
      quartile50_percentage: 20,
      quartile75_percentage: 27,
      quartile100_percentage: 6,
      video_item: videoItem.attrs,
      links: {
        videoItem: `/v3/videos/${videoItem.id}`
      },
    });
  });

  visit(`site/${boardId}/intel/video`);
  click('.report-item:last i.icon');

  andThen(function() {
    assert.equal(find(testSelector('selector', 'report-item')).length, 17, '15 videos are shown');
    assert.equal(find('.report-wrapper .pagination .summary').text().trim(), 'Showing 1 – 15 of 35', 'pagination meta information is rendered');
    assert.equal(find(testSelector('selector', 'load-more-videos')).length, 1, 'load more button is rendered');
    assert.equal(find(testSelector('selector', 'load-more-videos')).text().trim(), 'load more videos', 'it has the right text');
  });

  percySnapshot('load-more-videos-first');
  click(testSelector('selector', 'load-more-videos'));

  andThen(function() {
    assert.equal(find(testSelector('selector', 'report-item')).length, 32, '30 videos are shown');
    assert.equal(find('.report-wrapper .pagination .summary').text().trim(), 'Showing 1 – 30 of 35', 'pagination meta information is rendered');
    assert.equal(find(testSelector('selector', 'load-more-videos')).length, 1, 'load more button is rendered');
  });

  percySnapshot('load-more-videos-middle');
  click(testSelector('selector', 'load-more-videos'));

  andThen(function() {
    assert.equal(find(testSelector('selector', 'report-item')).length, 37, '35 videos are shown');
    assert.equal(find('.report-wrapper .pagination .summary').text().trim(), 'Showing 1 – 35 of 35', 'pagination meta information is rendered');
    assert.equal(find(testSelector('selector', 'load-more-videos')).length, 0, 'load more button has disappeared');
  });

  percySnapshot('load-more-videos-end');
});
