import React, { useState } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
import Data from '@/components/Data'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import Image from 'next/image';


const query = gql`{
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
}`
const url = 'https://api.studio.thegraph.com/query/99604/testing/version/latest'

export default async function GameInfoPage() {

  // const [showTable, setShowTable] = useState(false);
  // const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['data'],
    async queryFn() {
      return await request(url, query)
    }
  })
  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
      <Data />
    </HydrationBoundary>
  );
}
