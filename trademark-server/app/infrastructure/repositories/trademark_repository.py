from typing import List, Optional
from sqlmodel import Session, select
from datetime import datetime
from app.domain.models.trademark import Trademark, TrademarkCreate, TrademarkUpdate
from app.domain.interfaces.trademark_interface import TrademarkRepositoryInterface

class TrademarkRepository(TrademarkRepositoryInterface):
    def __init__(self, session: Session):
        self.session = session
    
    def create(self, trademark_data: TrademarkCreate) -> Trademark:
        trademark = Trademark(**trademark_data.model_dump())
        self.session.add(trademark)
        self.session.commit()
        self.session.refresh(trademark)
        return trademark
    
    def get_by_id(self, trademark_id: int) -> Optional[Trademark]:
        statement = select(Trademark).where(Trademark.id == trademark_id)
        return self.session.exec(statement).first()
    
    def get_all(self, skip: int = 0, limit: int = 100) -> List[Trademark]:
        statement = select(Trademark).offset(skip).limit(limit)
        return list(self.session.exec(statement).all())
    
    def update(self, trademark_id: int, trademark_update: TrademarkUpdate) -> Optional[Trademark]:
        trademark = self.get_by_id(trademark_id)
        if not trademark:
            return None
        
        update_data = trademark_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(trademark, field, value)
        
        trademark.updated_at = datetime.utcnow()
        self.session.add(trademark)
        self.session.commit()
        self.session.refresh(trademark)
        return trademark
    
    def delete(self, trademark_id: int) -> bool:
        trademark = self.get_by_id(trademark_id)
        if not trademark:
            return False
        
        self.session.delete(trademark)
        self.session.commit()
        return True
    
    def get_by_brand_name(self, brand_name: str) -> Optional[Trademark]:
        statement = select(Trademark).where(Trademark.brand_name == brand_name)
        return self.session.exec(statement).first()