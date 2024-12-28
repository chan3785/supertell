'use client';

import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import Image from 'next/image';

const query = gql`
  {
    feeAmountEnableds(first: 5) {
      id
      fee
      tickSpacing
      blockNumber
    }
    ownerChangeds(first: 5) {
      id
      oldOwner
      newOwner
      blockNumber
    }
  }
`;

const url = 'https://api.studio.thegraph.com/query/99604/testing/version/latest';

interface FeeAmountEnabled {
    id: string;
    fee: number;
    tickSpacing: number;
    blockNumber: string;
  }
  
  interface OwnerChanged {
    id: string;
    oldOwner: string;
    newOwner: string;
    blockNumber: string;
  }
  
  interface QueryResult {
    feeAmountEnableds: FeeAmountEnabled[];
    ownerChangeds: OwnerChanged[];
  }
  
export default function Data() {
  const { data, isLoading, error } = useQuery<QueryResult>({
    queryKey: ['data'],
    queryFn: async () => {
      return await request(url, query);
    },
  });

  const [showTable, setShowTable] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const feeAmountEnableds = data?.feeAmountEnableds;
  const ownerChangeds = data?.ownerChangeds;


  return (
    <div className="relative h-screen overflow-y-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Game Info</h1>

      <button
        onClick={() => setShowTable(!showTable)}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {showTable ? 'Hide Tables' : 'Show Tables'}
      </button>

      {showTable && (
        <>
          <h2 className="mb-4 text-xl font-semibold">Fee Amount Enableds</h2>
          <Table className="mb-8 rounded-lg border border-gray-300 shadow-md">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="px-6 py-4 text-left text-gray-700">ID</TableHead>
                <TableHead className="px-6 py-4 text-left text-gray-700">Fee</TableHead>
                <TableHead className="px-6 py-4 text-left text-gray-700">Tick Spacing</TableHead>
                <TableHead className="px-6 py-4 text-left text-gray-700">Block Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeAmountEnableds?.map((item:any) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="border-b border-gray-200 px-6 py-4 text-gray-800">
                    {item.id}
                  </TableCell>
                  <TableCell className="border-b border-gray-200 px-6 py-4 text-gray-800">
                    {item.fee}
                  </TableCell>
                  <TableCell className="border-b border-gray-200 px-6 py-4 text-gray-800">
                    {item.tickSpacing}
                  </TableCell>
                  <TableCell className="border-b border-gray-200 px-6 py-4 text-gray-800">
                    {item.blockNumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h2 className="mb-4 text-xl font-semibold">Owner Changed</h2>
          <Table className="rounded-lg border border-gray-300 shadow-md">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="px-6 py-4 text-left text-gray-700">ID</TableHead>
                <TableHead className="px-6 py-4 text-left text-gray-700">Old Owner</TableHead>
                <TableHead className="px-6 py-4 text-left text-gray-700">New Owner</TableHead>
                <TableHead className="px-6 py-4 text-left text-gray-700">Block Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ownerChangeds?.map((item:any) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="border-b border-gray-200 px-6 py-4 text-gray-800">
                    {item.id}
                  </TableCell>
                  <TableCell className="border-b border-gray-200 px-6 py-4 text-gray-800">
                    {item.oldOwner}
                  </TableCell>
                  <TableCell className="border-b border-gray-200 px-6 py-4 text-gray-800">
                    {item.newOwner}
                  </TableCell>
                  <TableCell className="border-b border-gray-200 px-6 py-4 text-gray-800">
                    {item.blockNumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      <div className="absolute right-4 top-4">
        <Image src="/thegraphlogo.png" alt="TheGraph Logo" width={100} height={100} />
      </div>
    </div>
  );
}
