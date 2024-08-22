'use client';
import { ServiceConfig } from '@/config/services-config';
import React from 'react';
import DataTable from 'react-data-table-component';

interface Column {
    name: string;
    selector: string | ((row: any) => any);
    sortable?: boolean;
}

interface Params {
    data: any[];
    pageId: string;
    pageSize: number;
}

interface Action {
    icon?: string;
    iconColor?: string;
    title: string;
    url: string;
    mode: string;
}

interface TableConfig {
    columns: Column[];
    actions: Action[];
}

const myApplications: TableConfig = {
    columns: [
        { name: 'Application ID', selector: 'applicationId' },
        { name: 'Service', selector: 'serviceName' },
        { name: 'Status', selector: 'statusEnglish' },
        { name: 'Date of Submission', selector: 'creationDate' },
    ],
    actions: [
        {
            icon: 'Edit',
            iconColor: 'primary',
            title: 'Edit',
            url: '/services/', // The base URL for services
            mode: 'edit'
        },
    ]
};

const getServiceUrl = (applicationDefinitionId: number) => {

    let service = ServiceConfig.find((service) => service.applicationDefinitionId == applicationDefinitionId);
    return service?.serviceId;

}

const getColumns = (id: string): TableConfig => {



    switch (id) {
        case 'myApplications':
            return myApplications;
        default:
            return { columns: [], actions: [] } as TableConfig;
    }
};

const ESEDataTable: React.FC<Params> = ({ data, pageSize, pageId }) => {
    const tableConfig = getColumns(pageId);
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {tableConfig.columns.map((col) => (
                            <th key={col.name} scope="col" className="px-6 py-3">
                                {col.name}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((app, index) => (
                        <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            key={index}
                        >
                            {tableConfig.columns.map((col) => (
                                <td key={col.name} className="px-6 py-4">
                                    {typeof col.selector === 'function'
                                        ? col.selector(app)
                                        : app[col.selector]}
                                </td>
                            ))}
                            <td className="flex space-x-2">{getServiceUrl(app.applicationDefinitionId)}
                                {tableConfig.actions.map((action) => (
                                    <a
                                        href={`${action.url}${getServiceUrl(app.applicationDefinitionId)}?requestId=${app.requestId}&mode=${action.mode}`}
                                        key={action.title}
                                        className="aegov-btn btn-link text-primary-600"
                                        title={action.title}
                                    >
                                        {action.title}
                                    </a>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ESEDataTable;
