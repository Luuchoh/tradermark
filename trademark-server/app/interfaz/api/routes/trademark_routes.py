from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from app.domain.models.trademark import TrademarkCreate, TrademarkUpdate, TrademarkResponse
from app.application.services.trademark_service import TrademarkService
from app.infrastructure.repositories.trademark_repository import TrademarkRepository
from app.infrastructure.database.connection import get_session

router = APIRouter()

def get_trademark_service(session: Session = Depends(get_session)) -> TrademarkService:
    repository = TrademarkRepository(session)
    return TrademarkService(repository)

@router.post("/trademarks", response_model=TrademarkResponse, status_code=status.HTTP_201_CREATED)
def create_trademark(
    trademark: TrademarkCreate,
    service: TrademarkService = Depends(get_trademark_service)
):
    """Create a new trademark registration"""
    try:
        created_trademark = service.create_trademark(trademark)
        return created_trademark
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.get("/trademarks", response_model=List[TrademarkResponse])
def get_trademarks(
    skip: int = 0,
    limit: int = 100,
    service: TrademarkService = Depends(get_trademark_service)
):
    """Get all trademark registrations with pagination"""
    try:
        trademarks = service.get_all_trademarks(skip=skip, limit=limit)
        return trademarks
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.get("/trademarks/{trademark_id}", response_model=TrademarkResponse)
def get_trademark(
    trademark_id: int,
    service: TrademarkService = Depends(get_trademark_service)
):
    """Get a specific trademark by ID"""
    try:
        trademark = service.get_trademark_by_id(trademark_id)
        if not trademark:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Trademark with ID {trademark_id} not found"
            )
        return trademark
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.put("/trademarks/{trademark_id}", response_model=TrademarkResponse)
def update_trademark(
    trademark_id: int,
    trademark_update: TrademarkUpdate,
    service: TrademarkService = Depends(get_trademark_service)
):
    """Update a trademark registration"""
    try:
        updated_trademark = service.update_trademark(trademark_id, trademark_update)
        if not updated_trademark:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Trademark with ID {trademark_id} not found"
            )
        return updated_trademark
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.delete("/trademarks/{trademark_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trademark(
    trademark_id: int,
    service: TrademarkService = Depends(get_trademark_service)
):
    """Delete a trademark registration"""
    try:
        deleted = service.delete_trademark(trademark_id)
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Trademark with ID {trademark_id} not found"
            )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.get("/trademarks/search/{brand_name}", response_model=TrademarkResponse)
def get_trademark_by_brand_name(
    brand_name: str,
    service: TrademarkService = Depends(get_trademark_service)
):
    """Search for a trademark by brand name"""
    try:
        trademark = service.get_trademark_by_brand_name(brand_name)
        if not trademark:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Trademark with brand name '{brand_name}' not found"
            )
        return trademark
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))