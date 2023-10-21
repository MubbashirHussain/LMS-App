import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

// let Demo = { title: 123, description: "hello world", BottomComp: <>hellow</>, WithTitleComponent: <>456</> }


type Props = {
    Data: {
        title: string | number,
        description?: string | number,
        duration?: number,
        BottomComp?: React.ReactElement
        WithTitleComponent?: React.ReactElement,
        Media?: {
            imageSrc: string,
            title?: string,
            sx?: SxProps<Theme>,
            ClassName?: string
        }
    },
    sx?: SxProps<Theme>,
    ClassName?: string,
    onCardClick?: CallableFunction,

}



export default function MediaCard(props: Props) {
    const { Data, ClassName, sx, onCardClick } = props
    return (
        <Card onClick={() => onCardClick && onCardClick()}
            sx={{ ...sx, maxWidth: 345, minWidth: 300, minHeight: 200 }}
            className={"flex flex-col justify-between " + ClassName}>
            {Data.Media && <CardMedia
                className={Data.Media.ClassName}
                sx={{ ...Data.Media.sx, height: 140 }}
                image={Data.Media.imageSrc}
                title={Data.Media.title}
            />}
            <CardContent>
                <div className='flex justify-between items-center'>
                    <Typography gutterBottom variant="h5" component="div">
                        {Data.title}
                    </Typography>
                    {Data.WithTitleComponent}

                </div>
                <div className="overflow-hidden">
                    <Typography className="text-ellipsis text-start box whitespace-pre-wrap" sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                    }}>
                        {Data.description}
                    </Typography>
                </div>
            </CardContent>
            <CardActions className="">
                {Data.BottomComp}
            </CardActions>
        </Card>
    );
}