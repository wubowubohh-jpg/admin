import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildResellerOperationsAlertClass,
  hasFinancePermission,
  normalizeCurrencyRows,
} from '../src/utils/resellerOperations.ts'

test('reseller operations alert classes follow level', () => {
  assert.equal(buildResellerOperationsAlertClass('warning').includes('amber'), true)
  assert.equal(buildResellerOperationsAlertClass('info').includes('sky'), true)
  assert.equal(buildResellerOperationsAlertClass('other').includes('border-border'), true)
})

test('reseller operations finance permission uses exact backend object', () => {
  assert.equal(hasFinancePermission((permission) => permission === 'GET:/admin/resellers/operations/finance'), true)
  assert.equal(hasFinancePermission((permission) => permission === 'GET:/admin/resellers/ledger-entries'), false)
})

test('reseller operations currency rows normalize empty arrays', () => {
  assert.deepEqual(normalizeCurrencyRows(undefined), [])
  assert.deepEqual(normalizeCurrencyRows([{ currency: 'usd', gmv_paid: '1.20' } as any]), [
    { currency: 'USD', gmv_paid: '1.20' },
  ])
})
