import {addAlert, alerts, alertMap} from '../alert';
import type {Alert} from '../objects/Alert';

describe('addAlert', () => {
  let _alerts: Record<symbol, Alert>;

  beforeAll(() => {
    alerts.subscribe((a) => _alerts = a);
  });

  beforeEach(() => {
    alertMap.update(() => ({}));
  });

  it('should add and remove alerts', () => {
    // when
    const removeAlert = addAlert({message: 'TEST'}, 5);

    // then
    expect(_alerts).toEqual([{message: 'TEST'}]);

    // when
    removeAlert();

    // then
    expect(_alerts).toEqual([]);
  });

  it('should remove alerts after delay', async () => {
    // when
    addAlert({message: 'TEST 2'}, 5);

    // then
    expect(_alerts).toEqual([{message: 'TEST 2'}]);

    // when
    await new Promise((resolve) => setTimeout(resolve, 5));

    // then
    expect(_alerts).toEqual([]);
  });
});
