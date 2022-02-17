import React from 'react'
import Header from './header';
import TablesTableRow from "./TablesTabelRow";
import {tablesTableData } from "./general";
import Card from "./Card";

import {
    Flex,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
  } from "@chakra-ui/react";

const Test = () => {
    const textColor = useColorModeValue("gray.700", "white");
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Table variant="simple" color={textColor}>
      <Thead>
        <Tr my=".8rem" pl="0px" color="gray.400">
          <Th pl="0px" color="gray.400">
            Author
          </Th>
          <Th color="gray.400">Function</Th>
          <Th color="gray.400">Status</Th>
          <Th color="gray.400">Employed</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {tablesTableData.map((row) => {
          return (
            <TablesTableRow
              name={row.name}
              logo={row.logo}
              email={row.email}
              subdomain={row.subdomain}
              domain={row.domain}
              status={row.status}
              date={row.date}
            />
          );
        })}
      </Tbody>
      </Table>
    </Flex>
  )
}

export default Test