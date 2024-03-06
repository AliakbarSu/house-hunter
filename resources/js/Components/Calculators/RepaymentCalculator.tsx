import { useState } from 'react';
import { ifElse } from '@/utils';

const RepaymentCalculator = () => {
  const [data, setData] = useState({
    principal: 300000,
    interestRate: 4.5,
    years: 25,
    monthlyRepayment: 1667.5,
    totalRepayment: 500249.23,
  });
  const [processing, setProcessing] = useState(false);
  const calculateRepayment = (): void => {
    setProcessing(true);
    const monthlyInterestRate: number = data.interestRate / 100 / 12;
    const months: number = data.years * 12;
    const monthlyPayment: number =
      (data.principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -months));
    const totalRepayment: number = monthlyPayment * months;

    setData({ ...data, totalRepayment, monthlyRepayment: monthlyPayment });
    setTimeout(() => {
      setProcessing(false);
    }, 1000);
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            {/*<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">*/}
            {/*  Loan repayment calculator*/}
            {/*</h2>*/}
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Calculate your monthly loan repayment amount
            </p>
          </div>
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            {processing ? (
              <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
                Calculating...
              </h2>
            ) : (
              <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
                Monthly repayment: ${data.monthlyRepayment.toFixed(2)}
              </h2>
            )}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-1 lg:grid-cols-3">
            <div className="flex flex-col bg-gray-400/5 p-8">
              <dt className="text-sm font-semibold leading-6 text-gray-600">
                Principal
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                ${data.principal}
              </dd>
            </div>
            <div className="flex flex-col bg-gray-400/5 p-8">
              <dt className="text-sm font-semibold leading-6 text-gray-600">
                Interest Rate
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                {data.interestRate}% p.a.
              </dd>
            </div>
            <div className="flex flex-col bg-gray-400/5 p-8">
              <dt className="text-sm font-semibold leading-6 text-gray-600">
                Years
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                {data.years}
              </dd>
            </div>
          </dl>
          <div className="flex gap-3 justify-between py-8 flex-wrap md:flex-nowrap">
            <div className="w-full md:w-1/3">
              <label
                htmlFor="principal"
                className="block text-sm font-medium text-gray-700"
              >
                Principal
              </label>
              <div className="mt-1">
                <input
                  onChange={e =>
                    setData({ ...data, principal: +e.target.value })
                  }
                  type="number"
                  id="principal"
                  value={data.principal}
                  name="principal"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <label
                htmlFor="interestRate"
                className="block text-sm font-medium text-gray-700"
              >
                Interest Rate
              </label>
              <div className="mt-1">
                <input
                  onChange={e =>
                    setData({ ...data, interestRate: +e.target.value })
                  }
                  type="number"
                  id="interestRate"
                  value={data.interestRate}
                  name="interestRate"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <label
                htmlFor="years"
                className="block text-sm font-medium text-gray-700"
              >
                Years
              </label>
              <div className="mt-1">
                <input
                  onChange={e => setData({ ...data, years: +e.target.value })}
                  type="number"
                  id="years"
                  value={data.years}
                  name="years"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="button"
              onClick={calculateRepayment}
              disabled={processing}
              className="w-full md:w-2/4 xl:w-1/4 rounded-md bg-indigo-600 mx-auto px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {ifElse(processing, 'Calculating...', 'Calculate')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepaymentCalculator;
