import { generateClient } from 'aws-amplify/api';
import { Schema } from "../../../amplify/data/resource";
import { useEffect, useState } from "react"
import { useParams } from "react-router"

const client = generateClient<Schema>();

export const BusinessPage = () => {
    const { businessId } = useParams()
    const [ saleItems, setSaleItems ] = useState<Array<Schema["SalesItem"]["type"]>>([]);

    console.log(businessId);
    

    useEffect(() => {
        const salesItemService = client.models.SalesItem.observeQuery().subscribe({
            next: (data) => {
                setSaleItems([...data.items])
            }
        });

        // const salesItemService = client.models.SalesItem.get({ id: businessId })

        return () => salesItemService.unsubscribe()
    }, [])

    console.log(saleItems);
    

    return (
        <>BUSINESS PAGE</>
    )
}