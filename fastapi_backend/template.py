from fastapi import HTTPException


SUCCESS_MESSAGE = {'detail': 'success'}


def check_data(record, error_msg):
    if record is None:
        raise HTTPException(status_code=404, detail=error_msg)
