/* eslint-disable */

  test('filtering videos', async function(assert) {
    server.create('video-tracking', 'invalid', { board_id: 1 });

    await page.visit();

    await page.table.filterTable('yourface');
    assert.equal(page.table.visibleVideoGroups, 2, 'video table renders without search text');
    assert.equal(page.table.videoRowCount, 2, '2 valid groups showing');

    await page.table.filterTable('videoid');
    assert.equal(page.table.visibleVideoGroups,1, `1 video groups showing filtered by networkVideoId`);
    assert.equal(page.table.videoRowCount, 1, '1 videos showing filtered by networkVideoId');

    await page.table.filterTable('Name');
    assert.equal(page.table.visibleVideoGroups, 2, `2 video groups showing filtered by title`);
    assert.equal(page.table.videoRowCount, 2, '2 videos showing filtered by title');

    await page.table.filterTable('NameSpaCe');
    assert.equal(page.table.visibleVideoGroups, 1, `1 video group showing filtered by case insensitively`);
    assert.equal(page.table.videoRowCount, 1, '1 videos showing filtered by case insensitively');

    await page.table.filterTable('tomster');
    assert.equal(page.table.visibleVideoGroups, 0, `0 video groups showing - groups are filtered away`);
    assert.equal(page.table.videoRowCount, 0, '0 videos showing - groups are filtered away');
  });

  test('videos can be grouped after filtering', async function(assert) {
    await page.visit()
    await page.table.filterTable('Name');
    await page.table.checkVideo();
    await page.table.clickGroupModal();
    await click('.video-group-select-modal [data-test-video-group-title="Video Group B"]');
    await click('[data-test-submit-button="save-group"]')

    assert.equal(page.table.visibleVideoGroups, 1, `1 video groups showing`);
    assert.equal(page.table.videoRowCount, 2, '2 videos showing');
  });
