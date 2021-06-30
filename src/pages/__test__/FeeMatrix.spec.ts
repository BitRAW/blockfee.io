/**
 * @jest-environment jsdom
 */

import {matrixData} from '../../API/__mocks__/BitrawAPI';
import FeeMatrix from '../FeeMatrix.svelte';

jest.mock('../../API/BitrawAPI');

describe('FeeMatrix', () => {
  beforeAll(() => {
    // crypto is not defined in jest, mock randomness
    const mGetRandomValues = jest.fn().mockReturnValueOnce(new Uint32Array(10));
    Object.defineProperty(window, 'crypto', {
      value: {getRandomValues: mGetRandomValues},
    });
  });

  const createFeeMatrix = () => {
    const target = document.body.appendChild(document.createElement('div'));
    return new FeeMatrix({target});
  };

  const setTimezoneOffset = (offset: number) => {
    // eslint-disable-next-line no-extend-native
    Date.prototype.getTimezoneOffset = function() {
      return offset;
    };
  };

  it('should calculate matrix for UTC', async () => {
    // given
    setTimezoneOffset(0);
    const feeMatrix = createFeeMatrix();

    // when
    const state = feeMatrix.$capture_state() as any;
    const data = await state.data;

    // then
    expect(data.matrix).toEqual(matrixData());
  });

  it('should calculate matrix for UTC+02', async () => {
    // given
    setTimezoneOffset(-120);
    const feeMatrix = createFeeMatrix();

    // when
    const state = feeMatrix.$capture_state() as any;
    const data = await state.data;

    // then
    expect(data.matrix[0][2].value).toEqual(matrixData()[0][0].value);
    expect(data.matrix[0][0].value).toEqual(matrixData()[6][22].value);
  });

  it('should calculate matrix for UTC-02', async () => {
    // given
    setTimezoneOffset(120);
    const feeMatrix = createFeeMatrix();

    // when
    const state = feeMatrix.$capture_state() as any;
    const data = await state.data;

    // then
    expect(data.matrix[0][0].value).toEqual(matrixData()[0][2].value);
    expect(data.matrix[6][22].value).toEqual(matrixData()[0][0].value);
  });
});
